Feature: incrementer
  Scenario: increment by 1
    Given I have a variable with value 1
    When I increment by 1
    Then I should get 2

  Scenario: increment by 5
    Given I have a variable with value 1
    When I increment by 5
    Then I should get 6

  Scenario: increment by -5
    Given I have a variable with value 1
    When I increment by -5
    Then I should get -4
