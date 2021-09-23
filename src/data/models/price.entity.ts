import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Price {
	@Column()
	@PrimaryColumn()
	name: string;

	@Column({ type: 'decimal' })
	price: number;

	constructor(name: string, price: number) {
		this.name = name;
		this.price = price;
	}
}
