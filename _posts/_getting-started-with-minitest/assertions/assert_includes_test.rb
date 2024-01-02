require_relative 'test_helper'

describe Coffee do
  subject { Coffee.new.flavours }
  it { assert_includes subject.map(&:downcase), $possible_flavour }
end
