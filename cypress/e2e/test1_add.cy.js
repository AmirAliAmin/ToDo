describe('Todo Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should add a new todo item when title and description are entered and Add button is clicked', () => {
    const title = 'Test Todo';
    const description = 'This is a description for the test todo';
    cy.get('[data-testid="todo-item-0"]').should('not.exist');
    cy.get('[data-testid="title-input"]').type(title);
    cy.get('[data-testid="description-input"]').type(description);
    cy.get('[data-testid="add-button"]').click();


    cy.get('[data-testid="todo-item-0"]').should('exist');
    cy.get('[data-testid="todo-item-0"] h1').should('have.text', title);
    cy.get('[data-testid="todo-item-0"] p').should('have.text', description);
  });
});
