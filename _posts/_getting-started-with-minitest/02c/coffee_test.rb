require 'minitest/autorun'
require_relative 'coffee'

describe Coffee do
  it 'gives us a new Coffee' do
    assert_instance_of Coffee, Coffee.new
  end

  let(:possible_flavour) { %w[chocolate honey toffee].sample }

  it 'has a honey flavour' do
    tasted_flavours = Coffee.new.flavours.map(&:downcase)
    assert_includes tasted_flavours, possible_flavour
  end
end
