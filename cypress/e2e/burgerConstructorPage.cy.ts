describe('burgerConstructorPage', function () {
  it('should work', function () {
    cy.viewport(1400, 1000);
    cy.visit('/');
    cy.intercept(
      {method: "GET", url: "https://norma.nomoreparties.space/api/ingredients"},
      {fixture: "ingredients.json"}
    )
    cy.intercept(
      {method: "POST", url: "https://norma.nomoreparties.space/api/auth/login"},
      {fixture: "login-success.json"}
    )
    cy.intercept(
      {method: "POST", url: "https://norma.nomoreparties.space/api/orders"},
      {fixture: "order-success.json"}
    )
    //login
    cy.contains("Личный кабинет").click()
    cy.get(`input[name="email"]`).type("lol@kek")
    cy.get(`input[name="password"]`).type("123456")
    cy.get(`button:contains("Войти")`).click()
    //goto burgerConstructor
    cy.get(`[class^="app-header_headerLink_"] :contains("Конструктор")`).click()
    cy.get(`[class^=burger-constructor_ingredientsList_]`).as("burgerConstructorDrop")
    cy.get(`[class^=burger-ingredients_ingredientItems_]`).as("allIngredientList")
    //modal close by button
    cy.get("@allIngredientList").contains("Краторная булка N-200i").click()
    cy.get(`[class^=modal_closeIcon_]`).click()
    //modal close by esc
    cy.get("@allIngredientList").contains("Краторная булка N-200i").click()
    cy.get('#el').type(`{esc}`)
    //modal close by click
    cy.get("@allIngredientList").contains("Краторная булка N-200i").click()
    cy.get('[class^=modal-overlay_]').click(20, 20)
    //drag and drop
    cy.get("@allIngredientList").contains("Краторная булка N-200i").trigger("dragstart")
    cy.get(`@burgerConstructorDrop`).trigger("drop")
    cy.get("@allIngredientList").contains("Соус фирменный Space Sauce").trigger("dragstart")
    cy.get(`@burgerConstructorDrop`).trigger("drop")
    cy.get("@allIngredientList").contains(`Мясо бессмертных моллюсков Protostomia`).trigger("dragstart")
    cy.get(`@burgerConstructorDrop`).trigger("drop")
    //order submit
    cy.get(`@burgerConstructorDrop`).get(`[class^=constructor-element__price]`).should('have.lengthOf', 4)
    cy.get('button:contains("Оформить заказ")').click()
    cy.get(`[class^="order-details_glowNumbers_"]`).contains("666").should('have.lengthOf', 1)
  });
});