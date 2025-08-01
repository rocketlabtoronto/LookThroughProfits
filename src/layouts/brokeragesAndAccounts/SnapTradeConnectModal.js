import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useAuthStore } from "../../stores/useAuthStore";
import supabaseService from "../../services/supabaseService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { SnapTradeReact } from "snaptrade-react";

import axios from "axios";
import { setOpenConfigurator } from "context";

export default function SnapTradeConnectModal({
  open,
  onClose,
  brokerageName,
  error,
  loading,
  onSuccess,
  onError,
  onExit,
}) {
  const [loginLink, setLoginLink] = useState(null);
  const [localError, setLocalError] = useState(null); // Local error state for UI feedback
  /**
   * Handles SnapTrade registration and login link retrieval.
   * - Checks if user is registered with SnapTrade (via Edge Function).
   * - If not registered, registers user and saves userSecret to Zustand and Supabase.
   * - Always fetches login link and userSecret, updates Zustand and Supabase as needed.
   * - Handles and displays errors gracefully.
   */
  useEffect(() => {
    var SUPASEBASE_SERVICE_FOR_LOGIN = false;
    var NODEJS_SERVICE_FOR_LOGIN = true;
    const API_BASE = "http://localhost:3006/api";
    if (!open) {
      setLoginLink(null);
      setLocalError(null);
      return;
    }

    const handleSnapTradeAuth = async () => {
      const user = useAuthStore.getState().user;
      const userId = user?.email;
      setLocalError(null);
      setLoginLink(null);
      if (!userId) {
        setLocalError("User not found. Please log in again.");
        return;
      }

      try {
        // 1. Check if user is registered with SnapTrade (Edge Function: get-users)
        console.log("Calling supabaseService.getSnapTradeUser on UserId :", userId);
        const isRegistered = await supabaseService.getSnapTradeUser(userId);
        let userSecret = null;
        let loginLinkData = null;
        console.log("User isRegistered property is set to :", isRegistered);
        if (!isRegistered) {
          // 2. If not registered, register user (Edge Function: register-user)
          console.log("User is not registered with SnapTrade, registering now.");
          const regResult = await supabaseService.registerUser(userId);
          if (!regResult || !regResult.userSecret) {
            console.log("Failed to register with SnapTrade. Please try again later.");
            setLocalError("Failed to register with SnapTrade. Please try again later.");
            return;
          }
          userSecret = regResult.userSecret;
          // Save userSecret to Zustand store
          console.log(
            "Calling useAuthStore.setState({ snapUserSecret: userSecret }) and userSecret value is: ",
            userSecret
          );
          useAuthStore.setState({ snapUserSecret: userSecret });
          // Save userSecret to Supabase
          const { error: updateError } = await supabase
            .from("users")
            .update({ snapusersecret: userSecret })
            .eq("email", userId);
          if (updateError) {
            // Log but do not block user
            console.error("Failed to update userSecret in Supabase:", updateError);
          }
        } else {
          // 3. If already registered, get userSecret from Supabase
          // Fetch from Supabase
          const { data: userRow, error: fetchError } = await supabase
            .from("users")
            .select("snapusersecret")
            .eq("email", userId)
            .single();
          if (fetchError || !userRow?.snapusersecret) {
            console.log("Failed to retrieve SnapTrade user secret from Supabase:", fetchError);
            setLocalError("Could not retrieve SnapTrade user secret. Please contact support.");
            return;
          }
          userSecret = userRow.snapusersecret;
        }
        // Save userSecret to Zustand store
        console.log("SnapTrade userSecret:", userSecret);
        console.log("SnapTrade userId:", userId);
        console.log("useAuthStore.setState({ snapUserSecret: userSecret })");
        useAuthStore.setState({ snapUserSecret: userSecret });

        // 4. Always fetch login link (Edge Function: getSnapTradeLoginLink)
        if (SUPASEBASE_SERVICE_FOR_LOGIN) {
          console.log(
            "Calling supabaseService.getSnapTradeLoginLink passing in: userId, userSecret" +
              `\nuserId: ${userId}` +
              `\nuserSecret: ${userSecret}`
          );
          loginLinkData = await supabaseService.getSnapTradeLoginLink(userId, userSecret);
          console.log(`SnapTrade login link: ${loginLinkData}`);
          if (!loginLinkData) {
            setLocalError("Failed to retrieve SnapTrade login link. Please try again later.");
            setLoginLink(null);
            return;
          }
          setLoginLink(loginLinkData);
        }

        if (NODEJS_SERVICE_FOR_LOGIN) {
          console.log("Running Node.js service for SnapTrade login link");
          const res = await axios.get(`${API_BASE}/users/${userId}/${userSecret}/login`);
          console.log(`SnapTrade login link: ${res.data.redirectURI}`);
          window.open(res.data.redirectURI, "_self");
        }
      } catch (err) {
        // Catch-all error handler
        console.error("SnapTrade modal error:", err);
        setLocalError("An unexpected error occurred. Please try again later.");
        setLoginLink(null);
      }
    };

    handleSnapTradeAuth();
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Connect to SnapTrade
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom component="div">
          Integration is available for <b>{brokerageName}</b> via SnapTrade.
        </Typography>
        <Typography gutterBottom component="div">
          Click the button below to securely connect your account using SnapTrade.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SnapTradeConnectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  brokerageName: PropTypes.string.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onExit: PropTypes.func,
};
