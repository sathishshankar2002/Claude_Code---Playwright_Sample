@admin
Feature: OrangeHRM Admin Menu Visibility

  As a logged-in OrangeHRM administrator
  I want to see the Admin menu item
  So that I can confirm I have access to administrative features

  @menu @smoke
  Scenario: Verify Admin menu is visible
    Given I am on the OrangeHRM login page
    When I login with username "Admin" and password "Admin@1234"
    Then I should be logged in successfully
    And I capture the page screenshot as "admin-menu"
    And the "Admin" menu item should be visible
