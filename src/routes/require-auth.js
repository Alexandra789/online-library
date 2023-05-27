/* eslint-disable */

import React from "react";
import {Navigate} from "react-router-dom";

export function RequireAuth({children}) {
    const isAuth = localStorage.getItem('token');
    return isAuth ? children : <Navigate to="/auth" replace/>;
}
