import test from 'ava';
import 'babel-core/register';
import split from '../src/index';

test('many children', t => {
  const html = 'text text <a href="#whatever">link</a> text'

  const preview = split(html, 11);
  t.truthy(preview === 'text text <a href="#whatever">link</a>');
});

test('many children, middle result', t => {
  const html = '<span>text1</span><span>test2</span><span>test3</span>';

  const preview = split(html, 10);
  t.truthy(preview === '<span>text1</span><span>test2</span>');
});

test('one child', t => {
  const html = 'text text text text text text'

  const preview = split(html, 10);
  t.truthy(preview === 'text text');
});

test('one child, big word', t => {
  const html = 'textual information'

  const preview0 = split(html, 4);
  const preview = 'textual';

  t.truthy(preview0 === preview);
});
