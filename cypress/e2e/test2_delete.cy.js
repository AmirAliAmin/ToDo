describe('Todo Application', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should delete the specific todo div when delete button is clicked', () => {
      const title1 = 'Test Todo 1';
      const description1 = 'Description for test todo 1';
      const title2 = 'Test Todo 2';
      const description2 = 'Description for test todo 2';
  
      cy.get('[data-testid="title-input"]').type(title1);
      cy.get('[data-testid="description-input"]').type(description1);
      cy.get('[data-testid="add-button"]').click();
  
      cy.get('[data-testid="title-input"]').clear().type(title2);
      cy.get('[data-testid="description-input"]').clear().type(description2);
      cy.get('[data-testid="add-button"]').click();
  
      cy.get('[data-testid="todo-item-0"]').should('contain', title1).and('contain', description1);
      cy.get('[data-testid="todo-item-1"]').should('contain', title2).and('contain', description2);
  
     
      cy.get('[data-testid="delete-button-0"]').click();
  
    //   cy.get('[data-testid="todo-item-0"]', { timeout: 5000 }).should('not.exist');
  

    //   cy.get('[data-testid="todo-item-1"]').should('exist').and('contain', title2).and('contain', description2);
    });
  });
  