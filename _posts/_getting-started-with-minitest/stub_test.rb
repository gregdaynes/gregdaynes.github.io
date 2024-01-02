require_relative 'test_helper'

describe 'Cup' do
  let(:coffee) { Coffee.new }
  let(:cup) { Cup.new }

  before { cup.add coffee }

  it 'drinks a coffee slowly' do
    cup.stub :slow_drink, cup.filling = nil do
      cup.slow_drink
      assert_nil cup.filling
    end
  end
end
