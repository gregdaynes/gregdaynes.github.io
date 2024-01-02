require_relative 'test_helper'

class CoffeeTest < Minitest::Test
  def setup
    @cup = Cup.new
    @cup.add(Coffee.new)
  end

  def teardown
    @cup.drink
  end

  def test_cup_is_not_empty
    refute @cup.empty?
  end
end
