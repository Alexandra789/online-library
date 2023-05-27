/* eslint-disable */

import React from "react";
import {Navigate} from "react-router-dom";

export function RequireUnauth({children}) {
    const isAuth = localStorage.getItem('token');
    return isAuth ? <Navigate to="/books/all" replace/> : children;
}
