describe('Todo Application - LocalStorage', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should save todo items to localStorage when added', () => {
      const title = 'Test Todo';
      const description = 'Description for test todo';
  
     
      cy.get('[data-testid="title-input"]').type(title);
      cy.get('[data-testid="description-input"]').type(description);
      cy.get('[data-testid="add-button"]').click();
  
     
      cy.get('[data-testid="todo-item-0"]').should('contain', title).and('contain', description);
  
      
      cy.window().then((window) => {
        const savedTodos = JSON.parse(window.localStorage.getItem('todolsit'));
        expect(savedTodos).to.have.length(1); 
        expect(savedTodos[0]).to.have.property('title', title); 
        expect(savedTodos[0]).to.have.property('description', description); 
      });
    });
  });
  