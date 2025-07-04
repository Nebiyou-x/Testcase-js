Feature: Seller Registration
  As a seller, I want to register on the platform to access invoice financing.

  Scenario: Successful seller registration
    Given I am on the seller signup page
    When I fill in all required personal information
    And I fill in company details
    And I set a valid password
    And I enter address information
    And I provide bank account details
    And I select my date of birth as "July 2, 2025"
    When I submit the form
    Then I should see a success message