require 'minitest/autorun'
require_relative 'coffee'

class CoffeeTest < Minitest::Test
  def test_coffee
    assert_instance_of Coffee, Coffee.new
  end
end
