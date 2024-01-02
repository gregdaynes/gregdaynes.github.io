require_relative 'test_helper'

describe 'Coffee' do
  it 'checks the coffee rating' do
    assert(Coffee.new.rating == 'Amazing!')
  end

  it 'makes sure the taste is not bitter' do
    skip 'coffee.taste should not be bitter'
  end
end
