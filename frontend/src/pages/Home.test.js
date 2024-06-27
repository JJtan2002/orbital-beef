import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use actual implementation for other functions
    useNavigate: jest.fn(), // Mock useNavigate as a jest.fn()
}));

jest.mock('../contexts/AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('Home component', () => {
    it('renders welcome message', () => {
        useNavigate.mockReturnValue(jest.fn());
        useAuth.mockReturnValue({
            isLoggedIn: false,
            authTokens: null,
        });

        render(<Home />);

        expect(screen.getByText(/Welcome to CashFlow!/i)).toBeInTheDocument();
        expect(screen.getByText(/Streamline your money experience/i)).toBeInTheDocument();
    });

    it('renders dashboard link when logged in', () => {
        useNavigate.mockReturnValue(jest.fn());
        useAuth.mockReturnValue({
            isLoggedIn: true,
            authTokens: { access: 'mocked-access-token' },
        });

        render(<Home />);

        expect(screen.getByText(/Go to Dashboard/i)).toBeInTheDocument();
    });

    it('renders register link when not logged in', () => {
        useNavigate.mockReturnValue(jest.fn());
        useAuth.mockReturnValue({
            isLoggedIn: false,
            authTokens: null,
        });

        render(<Home />);

        expect(screen.getByText(/Sign up and Explore!/i)).toBeInTheDocument();
    });

    it('navigates to dashboard when logged in link is clicked', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        useAuth.mockReturnValue({
            isLoggedIn: true,
            authTokens: { access: 'mocked-access-token' },
        });

        render(<Home />);

        const dashboardLink = screen.getByText(/Go to Dashboard/i);
        fireEvent.click(dashboardLink);

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('navigates to register when not logged in link is clicked', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        useAuth.mockReturnValue({
            isLoggedIn: false,
            authTokens: null,
        });

        render(<Home />);
        const registerLink = screen.getByText(/Sign up and Explore!/i);
        fireEvent.click(registerLink);

        expect(mockNavigate).toHaveBeenCalledWith('/register');
    });
});