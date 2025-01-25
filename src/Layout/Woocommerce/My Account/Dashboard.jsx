import React, { lazy, Suspense, useEffect } from 'react';
import { useAuth } from '../../../Context/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Loader = lazy(() => import('../../../libs/Loader'));
const Sidebar = lazy(() => import('./Sidebar'));

const Dashboard = ({ pages }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === false) {
            toast.info('Please Login First To Access Dashboard',{
                position:"top-center", 
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
          navigate('/login');
        }
      }, [isLoggedIn, navigate]);
    if (isLoggedIn === null) return <Loader />; // Show loader while checking login status

    return (
        <section className='user-dashboard bg-gray-100 lg:py-16 py-8'>
            <div className="container mx-auto  md:px-8 xl:px-14 px-4 lg:px-10 2xl:px-10 ">
            <div className="bg-white ">
            <div className="flex flex-row justify-between px-5 py-4">
                        <h2 className="text-3xl font-medium">Your Dashboard</h2>
                        <p></p>
                    </div>
                <div className="grid grid-cols-1 lg:grid-cols-4  gap-4">
                    <div className="hidden border-r-[2px] pr-4 my-2 border-gray-100 sticky top-0 bottom-0 lg:block col-span-1">
                        <Suspense fallback={<></>} >
                            <Sidebar pages={pages} />
                        </Suspense>
                    </div>
                    <div className='lg:col-span-3 col-span-1 p-3 '>
                        <Suspense fallback={<Loader />}>
                            <Outlet />  {/* Render the child routes like /my-account/orders, etc. */}
                        </Suspense>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Dashboard;
