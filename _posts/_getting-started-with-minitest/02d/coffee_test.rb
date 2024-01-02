require 'minitest/autorun'
require_relative 'coffee'

describe Coffee do
  let(:possible_flavour) { %w[chocolate honey toffee].sample }

  subject { Coffee.new }

  it 'gives us a new Coffee' do
    assert_instance_of Coffee, subject
  end

  it 'has a honey flavour' do
    assert_includes subject.flavours.map(&:downcase), possible_flavour
  end
end
