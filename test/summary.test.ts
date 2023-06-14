import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';



describe('Summary Tests', () => {
  let clock: sinon.SinonFakeTimers;

  before(() => {
    // Freeze time to a specific date and time
    const now = new Date('2023-05-18T10:00:00Z');
    clock = sinon.useFakeTimers(now);
  });

  after(() => {
    // Restore the original clock
    clock.restore();
  });

  it('should calculate the daily summary', async () => {
    const summary = await getDailySummary();

    // Assert the expected summary values
    expect(summary).to.be.an('object');
    expect(summary).to.have.property('totalCount', 6);
    expect(summary).to.have.property('totalAmount', 236402);
    expect(summary).to.have.property('averageAmount', 39400.33);
    expect(summary).to.have.property('maxTransaction');
    expect(summary).to.have.property('minTransaction');
  });
});