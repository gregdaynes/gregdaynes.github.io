require_relative 'test_helper'

describe Coffee do
  it { assert(Coffee.new.rating == 'Amazing!') }
end
