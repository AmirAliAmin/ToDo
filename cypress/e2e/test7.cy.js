describe('Todo Application - Delete from LocalStorage', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:5173/');
    });
  
    it('should delete a todo item from localStorage when delete button is clicked', () => {
      const title = 'Test Todo';
      const description = 'Description for test todo';
  
      cy.get('[data-testid="title-input"]').type(title);
      cy.get('[data-testid="description-input"]').type(description);
      cy.get('[data-testid="add-button"]').click();
  
      cy.get('[data-testid="todo-item-0"]').should('contain', title).and('contain', description);
  
     
      cy.window().then((window) => {
        const savedTodos = JSON.parse(window.localStorage.getItem('todolsit'));
        expect(savedTodos).to.have.length(1); 
      });
  
     
      cy.get('[data-testid="delete-button-0"]').click();
  
    
      cy.get('[data-testid="todo-item-0"]').should('not.exist');
  
     
      cy.window().then((window) => {
        const savedTodos = JSON.parse(window.localStorage.getItem('todolsit'));
        expect(savedTodos).to.have.length(0); 
      });
    });
  });
  