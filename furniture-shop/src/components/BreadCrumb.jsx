import React from 'react';
import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const routes = [
    { path: '/blog', breadcrumb: 'Blog' },
    { path: '/contact', breadcrumb: 'Contact' },
    { path: '/products', breadcrumb: 'Products' },
    { path: '/register', breadcrumb: 'Register' },
    { path: '/', breadcrumb: 'Home' },

];
const BreadCrumb = () => {
    const breadcrumbs = useBreadcrumbs(routes);
    // console.log(breadcrumbs)

    return (
        <section>
            <h1></h1>
            <nav>
                {breadcrumbs.map(({ match, breadcrumb }) => (
                    <Link
                        key={match.pathname}
                        to={match.pathname}
                        className={match.pathname === location.pathname ? "breadcrumb-active breadcrumbLink" : "breadcrumb-not-active breadcrumbLink"}
                    >
                        {breadcrumb} <span className="dot"> • </span>
                    </Link>
                ))}
            </nav>
        </section>

    );
}

export default BreadCrumb;