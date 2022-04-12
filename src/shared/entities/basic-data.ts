import {Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from 'typeorm';

export abstract class BasicData {
  @Column({name: 'ACTIVE', default: true})
  active?: boolean;

  @Column({name: 'DELETED', default: false})
  deleted?: boolean;

  @CreateDateColumn({
    name: 'CREATED_AT',
    type: 'datetimeoffset',
    default: () => 'getutcdate()'
  })
  createdAt?: Date;

  @Column({name: 'CREATED_BY', nullable: true})
  createdBy?: string;

  @UpdateDateColumn({
    name: 'UPDATED_AT',
    type: 'datetimeoffset',
    nullable: true,
    default: () => 'null'
  })
  updatedAt?: Date;

  @Column({name: 'UPDATED_BY', nullable: true})
  updatedBy?: string;

  @DeleteDateColumn({
    name: 'DELETED_AT',
    type: 'datetimeoffset',
    nullable: true
  })
  deletedAt?: Date;

  @Column({name: 'DELETED_BY', nullable: true})
  deletedBy?: string;
}