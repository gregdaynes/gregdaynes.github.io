require 'rake/testtask'

desc 'Run test suite'
Rake::TestTask.new() do |t|
  t.pattern = './**/*_test.rb'
end
