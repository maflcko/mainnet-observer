ALTER TABLE input_stats ADD COLUMN inputs_spending_prev_1_blocks INTEGER NOT NULL DEFAULT (0);
ALTER TABLE input_stats ADD COLUMN inputs_spending_prev_6_blocks INTEGER NOT NULL DEFAULT (0);
ALTER TABLE input_stats ADD COLUMN inputs_spending_prev_144_blocks INTEGER NOT NULL DEFAULT (0);
ALTER TABLE input_stats ADD COLUMN inputs_spending_prev_2016_blocks INTEGER NOT NULL DEFAULT (0);
