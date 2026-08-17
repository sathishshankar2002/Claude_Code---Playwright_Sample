@login
Feature: OrangeHRM Login

  As a registered OrangeHRM user
  I want to log in to the portal
  So that I can access the dashboard

  @valid-credentials @smoke
  Scenario: Login with valid credentials
    Given I am on the OrangeHRM login page
    When I login with username "Admin" and password "Admin@1234"
    Then I should be logged in successfully
    And I capture a screenshot of the dashboard
    And the selected menu on the dashboard should contain "dashboard"
