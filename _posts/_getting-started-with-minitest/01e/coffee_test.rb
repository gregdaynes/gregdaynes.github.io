require 'minitest/autorun'
require_relative 'coffee'

class CoffeeTest < Minitest::Test
  def test_coffee
    assert_instance_of Coffee, Coffee.new
  end

  def test_coffee_flavour
    possible_flavour = 'honey'
    tasted_flavours = Coffee.new.flavours.map(&:downcase)
    assert_includes tasted_flavours, possible_flavour
  end
end
