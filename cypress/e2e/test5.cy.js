describe('Todo Application', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should mark a todo as completed, move it to the completed section, and delete it from there', () => {
      const title = 'Test Todo';
      const description = 'Description for test todo';
  
   
      cy.get('[data-testid="title-input"]').type(title);
      cy.get('[data-testid="description-input"]').type(description);
      cy.get('[data-testid="add-button"]').click();
  
      
      cy.get('[data-testid="todo-item-0"]').should('contain', title).and('contain', description);
  
   
      cy.get('[data-testid="complete-button-0"]').click();
  
     
      cy.get('[data-testid="todo-item-0"]').should('not.exist');
  
      cy.get('[data-testid="completed-button"]').click();
  
    
      cy.get('[data-testid="completed-todo-item-0"]').should('contain', title).and('contain', description);
  
      cy.get('[data-testid="delete-completed-0"]').click();

      cy.get('[data-testid="completed-todo-item-0"]').should('not.exist');
    });
  });
  