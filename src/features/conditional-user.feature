@conditional
Feature: Conditional test based on user

  As an OrangeHRM tester
  I want to determine the logged-in user's role
  So that I can validate access differently for Admin vs non-Admin users

  @user @smoke
  Scenario: Conditional test based on user
    Given I am on the OrangeHRM login page
    When I login with username "Admin" and password "Admin@1234"
    Then I should be logged in successfully
    When I check if the logged-in user is an Admin
    Then access should be validated based on the user's role
