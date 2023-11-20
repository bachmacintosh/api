export default function snowflakeToDate(snowflake: string): Date {
  const snowflakeNum = BigInt(snowflake);
  const DISCORD_EPOCH = 1420070400000n;
  const TIMESTAMP_BITS = 22n;
  // eslint-disable-next-line no-bitwise -- Bit Shift Right
  const timestamp = Number((snowflakeNum >> TIMESTAMP_BITS) + DISCORD_EPOCH);
  return new Date(timestamp);
}
