import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HashRouter, Navigate, Routes, Route} from "react-router-dom";

import {Home} from "../pages/home";
import {BookPage} from "../pages/book";
import {Terms} from "../pages/terms";
import {Header} from "../components/header";
import {Footer} from "../components/footer";

import './layout.css';

import {selectCategories} from "../redux/reducers/categores/selectors";
import {Auth} from "../pages/auth-page/auth";
import {Registration} from "../pages/auth-page/registration";
import {ForgotPassword} from "../pages/auth-page/forgot-password";
import {RequireAuth} from "../routes/require-auth";
import {RequireUnauth} from "../routes/require-unauth";

export function Layout() {
    const dispatch = useDispatch();
    const isAuth = localStorage.getItem('token');
    useEffect(() => {
        if (isAuth) {
            dispatch({type: 'REQUESTED_CATEGORIES'})
        }
    }, [dispatch, isAuth])

    const category = useSelector(selectCategories).data;
    const dictionaryCategory = {};

    category?.forEach(itemCateg => {
        dictionaryCategory[itemCateg.path] = itemCateg.name;
    });

    return (
        <div className="page-wrapper">
            <HashRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={
                        !isAuth ? <Navigate to='/auth'/> :
                            <Navigate to='/books/all'/>
                    }/>
                    <Route path='/auth' element={
                        <RequireUnauth>
                            <Auth/>
                        </RequireUnauth>
                    }/>
                    <Route path='/registration' element={
                        <RequireUnauth>
                            <Registration/>
                        </RequireUnauth>
                    }/>
                    <Route path='/forgot-pass' element={
                        <RequireUnauth>
                            <ForgotPassword/>
                        </RequireUnauth>
                    }/>
                    <Route path='/books/all' element={
                        <RequireAuth>
                            <Home dictionaryCategory={dictionaryCategory} category={category}/>
                        </RequireAuth>
                    }
                    />
                    <Route path='/books/:category' element={
                        <RequireAuth>
                            <Home dictionaryCategory={dictionaryCategory} category={category}/>
                        </RequireAuth>}
                    />
                    <Route path='/books/:category/:bookId'
                           element={<RequireAuth>
                               <BookPage dictionaryCategory={dictionaryCategory}/>
                           </RequireAuth>}/>
                    <Route path='/terms' element={
                        <RequireAuth>
                            <Terms contentView='terms'/>
                        </RequireAuth>
                    }/>
                    <Route path='/contract' element={
                        <RequireAuth>
                            <Terms contentView='contract'/>
                        </RequireAuth>
                    }/>
                </Routes>
                <Footer/>
            </HashRouter>
        </div>
    )
}
