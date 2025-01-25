import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Context/useAuth';
import { useQuery } from '@apollo/client';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies
import { DASHBOARD } from '../../../Queries/Queries';

const Sidebar = () => {
    const { logout } = useAuth();
    const [select, setSelect] = useState(0); 

    // Retrieve the selected index from the cookie when the component mounts
    useEffect(() => {
        const savedIndex = Cookies.get('selectedOption');
        if (savedIndex) {
            setSelect(parseInt(savedIndex, 10)); // Convert saved index back to a number
        }
    }, []);

    const handleChanges = (index) => {
        setSelect(index);
        Cookies.set('selectedOption', index); // Save the selected index to a cookie
    };

    const { loading, error, data } = useQuery(DASHBOARD, {
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-and-network'
    });

    if (loading) {
        return <p></p>;
    }
    if (error) {
        return <p>Error loading menu!</p>;
    }

    const menu = data.pageBy.pageBuilder.pages?.[0];

    const handleLogout = () => {
        logout();
        Cookies.remove('selectedOption'); // Clear the cookie on logout
    };

    return (
        <div className='h-80 sticky top-0 items-center grid text-center'>
            {menu.sidemenu.map((el, index) => (
                <Link
                    key={index}
                    className={`text-base p-2 mx-2 w-full text-start lg:text-lg font-normal transition-all ease-in ${
                        select === index ? 'bg-blues text-white' : 'hover:text-white hover:bg-blues'
                    }`}
                    onClick={() => handleChanges(index)}
                    aria-label={el.link.title}
                    to={`${el.link.url}`}
                >
                    {el.link.title}
                </Link>
            ))}
            <button
                onClick={handleLogout}
                className="text-base p-2 mx-2 w-full text-start lg:text-lg font-normal hover:text-white transition-all ease-in hover:bg-blues"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
