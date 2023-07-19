"""empty message

Revision ID: e00bc17a84c2
Revises: a7a5247bbcbe
Create Date: 2023-07-19 13:36:54.037856

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e00bc17a84c2'
down_revision = 'a7a5247bbcbe'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.alter_column('company_name',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.String(length=60),
               existing_nullable=False)
        batch_op.alter_column('country',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=40),
               existing_nullable=False)
        batch_op.alter_column('representative_name',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=40),
               existing_nullable=False)
        batch_op.alter_column('representative_contact',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.String(length=60),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customer', schema=None) as batch_op:
        batch_op.alter_column('representative_contact',
               existing_type=sa.String(length=60),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)
        batch_op.alter_column('representative_name',
               existing_type=sa.String(length=40),
               type_=sa.VARCHAR(length=20),
               existing_nullable=False)
        batch_op.alter_column('country',
               existing_type=sa.String(length=40),
               type_=sa.VARCHAR(length=20),
               existing_nullable=False)
        batch_op.alter_column('company_name',
               existing_type=sa.String(length=60),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)

    # ### end Alembic commands ###
