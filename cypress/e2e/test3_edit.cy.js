describe('Todo Application', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should display input fields on edit, update data, and save the edited todo', () => {
      const title = 'Test Todo';
      const description = 'Description for test todo';
      const updatedTitle = 'Updated Todo Title';
      const updatedDescription = 'Updated Todo Description';
  

      cy.get('[data-testid="title-input"]').type(title);
      cy.get('[data-testid="description-input"]').type(description);
      cy.get('[data-testid="add-button"]').click();
  
     
      cy.get('[data-testid="todo-item-0"]').should('contain', title).and('contain', description);
  
      
      cy.get('[data-testid="edit-button-0"]').click();
  

      cy.get('[data-testid="todo-edit-0"] [data-testid="edit-title-0"]')
        .should('be.visible')
        .clear()
        .type(updatedTitle);
      cy.get('[data-testid="todo-edit-0"] [data-testid="edit-description-0"]')
        .should('be.visible')
        .clear()
        .type(updatedDescription);
  
     
      cy.get('[data-testid="todo-edit-0"] [data-testid="save-edit-0"]').click();
  
     
      cy.get('[data-testid="todo-item-0"]').should('contain', updatedTitle).and('contain', updatedDescription);
    });
  });
  