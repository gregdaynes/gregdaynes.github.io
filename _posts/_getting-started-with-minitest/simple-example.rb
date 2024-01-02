require 'minitest/autorun'

class Coffee
  attr_reader :color

  def initialize
    @color = :black
  end
end

class CoffeeTest < Minitest::Test
  def test_color
    fresh_coffee = Coffee.new
    assert cup_of_coffee.color == :black
  end
end
