import { expect } from 'code';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { stub, SinonStub } from 'sinon';
import { PropToggle } from '../demo/assets/components/prop-toggle';

describe('Demo: ParamToggle component', () => {
	let wrapper: ReactWrapper;
	let onClick: SinonStub;

	describe('with the default options (true/false)', () => {
		describe('when current=false', () => {
			before(() => {
				onClick = stub();
				wrapper = mount(<PropToggle name="p189j" current={false} onClick={onClick} />);
			});

			it('has a span with the property name in it', () => {
				expect(wrapper.find('span.code').text()).equals('p189j');
			});

			it('has a true and a false button', () => {
				expect<string[]>(wrapper.find('button').map((el) => el.text())).to.equal(['true', 'false']);
			});

			it('has the false button as "selected"', () => {
				expect(wrapper.find('#param-toggle-p189j-false').prop('className')).to.equal('selected');
			});

			it('has the true button as "unselected"', () => {
				expect(wrapper.find('#param-toggle-p189j-true').prop('className')).to.equal('');
			});

			it('calls the onClick function when the "true" button is clicked', () => {
				wrapper.find('#param-toggle-p189j-true').simulate('click');

				expect(onClick.callCount).to.equal(1);
				expect(onClick.firstCall.args).to.equal(['p189j', true]);
			});
		});

		describe('when current=true', () => {
			before(() => {
				onClick = stub();
				wrapper = mount(<PropToggle name="p189j" current={true} onClick={onClick} />);
			});

			it('has the true button as "selected"', () => {
				expect(wrapper.find('#param-toggle-p189j-true').prop('className')).to.equal('selected');
			});

			it('has the false button as "unselected"', () => {
				expect(wrapper.find('#param-toggle-p189j-false').prop('className')).to.equal('');
			});

			it('calls the onClick function when the "false" button is clicked', () => {
				wrapper.find('#param-toggle-p189j-false').simulate('click');

				expect(onClick.callCount).to.equal(1);
				expect(onClick.firstCall.args).to.equal(['p189j', false]);
			});
		});
	});

	describe('with custom options', () => {
		before(() => {
			onClick = stub();
			wrapper = mount(<PropToggle name="p189j" current="abc" options={['abc', 'def', false]} onClick={onClick} />);
		});

		it('has the \'abc\' button as "selected"', () => {
			expect(wrapper.find('#param-toggle-p189j-abc').prop('className')).to.equal('selected');
		});

		it('has the \'def\' button as "unselected"', () => {
			expect(wrapper.find('#param-toggle-p189j-def').prop('className')).to.equal('');
		});

		it('calls the onClick function when the "false" button is clicked', () => {
			wrapper.find('#param-toggle-p189j-def').simulate('click');

			expect(onClick.callCount).to.equal(1);
			expect(onClick.firstCall.args).to.equal(['p189j', 'def']);
		});
	});
});
