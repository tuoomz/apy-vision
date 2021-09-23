import { Exclude } from 'class-transformer';
import { Portfolio } from 'src/portfolio/models/portfolio.entity';
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	@Exclude()
	password: string;

	@OneToOne((type) => Portfolio, { cascade: true })
	@JoinColumn()
	portfolio: Portfolio;
}
