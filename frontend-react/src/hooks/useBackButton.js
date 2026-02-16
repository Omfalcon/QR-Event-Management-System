import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';

export const useBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleBackButton = App.addListener('backButton', ({ canGoBack }) => {
            // If we're on the home page (AdminDashboard), exit the app
            if (location.pathname === '/' || location.pathname.startsWith('/?day=')) {
                App.exitApp();
            } else {
                // Otherwise, navigate back
                if (canGoBack) {
                    navigate(-1);
                } else {
                    // If can't go back, go to home
                    navigate('/');
                }
            }
        });

        // Cleanup listener on unmount
        return () => {
            handleBackButton.then(listener => listener.remove());
        };
    }, [navigate, location]);
};
