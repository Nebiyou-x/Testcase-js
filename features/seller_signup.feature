Feature: Seller Registration
  As a seller, I want to register on the platform to access invoice financing.

  Scenario: Successful seller registration
    Given I am on the seller signup page
    When I fill in all required personal information
    And I fill in company details
    And I set a valid password
    And I enter address information
    And I provide bank account details
    And I select day from the date picker
    When I submit the form
    Then I should see a success message