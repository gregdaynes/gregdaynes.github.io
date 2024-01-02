require_relative 'test_helper'

describe 'Coffee' do
  let(:cup) { Cup.new }

  before do
    cup.add(Coffee.new)
  end

  after { cup.drink }

  it 'checks the cup has coffee in it' do
    refute cup.empty?
  end
end
