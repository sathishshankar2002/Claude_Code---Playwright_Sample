@directory
Feature: OrangeHRM Employee Directory

  As a logged-in OrangeHRM user
  I want to search the employee directory
  So that I can view existing employees as cards

  @search @smoke
  Scenario: Search employee in directory
    Given I am on the OrangeHRM login page
    When I login with username "Admin" and password "Admin@1234"
    Then I should be logged in successfully
    When I open the "Directory" menu
    And I click the Search button in the directory
    Then the directory should display employee cards
    And I capture a screenshot of the directory
