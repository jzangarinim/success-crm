"""empty message

Revision ID: a7a5247bbcbe
Revises: 59c18478415f
Create Date: 2023-07-19 13:12:47.260325

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a7a5247bbcbe'
down_revision = '59c18478415f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('virtualassistant')
    with op.batch_alter_table('project', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('start_date', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('end_date', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('project', schema=None) as batch_op:
        batch_op.drop_column('end_date')
        batch_op.drop_column('start_date')
        batch_op.drop_column('description')

    op.create_table('virtualassistant',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('hourly_rate', sa.NUMERIC(precision=4, scale=2), autoincrement=False, nullable=False),
    sa.Column('weekly_availability', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='virtualassistant_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='virtualassistant_pkey')
    )
    # ### end Alembic commands ###
