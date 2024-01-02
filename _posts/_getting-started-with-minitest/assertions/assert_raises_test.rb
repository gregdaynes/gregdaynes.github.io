require_relative 'test_helper'

describe 'Cup' do
  let(:coffee) { Coffee.new }
  let(:cup) { Cup.new }

  it 'raises when we add another cup' do
    assert_raises RuntimeError do
      cup.add(Cup.new)
    end
  end
end
