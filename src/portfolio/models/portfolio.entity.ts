import { isDecimal } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portfolio')
export class Portfolio {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	lp_pool_name: string;

	@Column({ type: 'decimal' })
	lp_pool_tokens: number;

	value: number;
}
