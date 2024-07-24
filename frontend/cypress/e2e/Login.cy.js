describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should display the login form', () => {
        cy.get('h5').contains('Login to your account');
        cy.get('input[name=email]').should('be.visible');
        cy.get('input[name=password]').should('be.visible');
        cy.get('button[type=submit]').contains('Submit');
    });

    it('should show an error for invalid email format', () => {
        cy.get('input[name=email]').type('invalidemail@g');
        cy.get('input[name=password]').type('password');
        cy.get('button[type=submit]').click();

        cy.get('.Toastify__toast--error').contains('Wrong email format');
    });

    it('should show an error for short password', () => {
        cy.get('input[name=email]').type('test@example.com');
        cy.get('input[name=password]').type('123');
        cy.get('button[type=submit]').click();

        cy.get('.Toastify__toast--error').contains('Password should be at least 4 characters long');
    });

    it('should show an error for invalid credentials', () => {
        cy.intercept('POST', '**/api/token/', {
            statusCode: 401,
            body: {
                detail: 'Invalid email or password'
            }
        }).as('loginRequest');

        cy.get('input[name=email]').type('test@example.com');
        cy.get('input[name=password]').type('wrongpassword');
        cy.get('button[type=submit]').click();

        cy.wait('@loginRequest');
        cy.get('.Toastify__toast-body').contains('Login failed: Invalid email or password!');
    });

    it('should successfully log in with correct credentials', () => {
        cy.intercept('POST', '**/api/token/', (req) => {
            console.log('Request Body:', req.body);
            req.reply({
                statusCode: 200,
                body: {
                    access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                    refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                }
            });
        }).as('loginRequest');

        cy.get('input[name=email]').type('test@example.com');
        cy.get('input[name=password]').type('correctpassword');
        cy.get('button[type=submit]').click();

        cy.wait('@loginRequest');
        cy.get('.Toastify__toast--success', { timeout: 10000 }).should('contain', 'Login Successfully!');
        cy.url().should('include', '/dashboard');
    });
});