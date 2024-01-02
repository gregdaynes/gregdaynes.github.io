require 'minitest/autorun'

class CoffeeTest < Minitest::Test
  def test_coffee
    assert_instance_of Coffee, Coffee.new
  end
end
