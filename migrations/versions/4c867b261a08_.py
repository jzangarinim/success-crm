"""empty message

Revision ID: 4c867b261a08
Revises: 
Create Date: 2023-07-19 20:18:05.689979

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4c867b261a08'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_logo_url', sa.String(length=256), nullable=True),
    sa.Column('company_name', sa.String(length=60), nullable=False),
    sa.Column('company_address', sa.String(length=80), nullable=False),
    sa.Column('country', sa.String(length=40), nullable=False),
    sa.Column('representative_name', sa.String(length=40), nullable=False),
    sa.Column('representative_contact', sa.String(length=60), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('department', sa.Enum('hr', 'sales', 'finances', 'trial', 'recruitment', name='departments'), nullable=False),
    sa.Column('role', sa.Enum('admin', 'head_of_department', 'account_manager', 'virtual_assistant', 'member', name='roles'), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('last_name', sa.String(length=20), nullable=False),
    sa.Column('hourly_rate', sa.Numeric(precision=4, scale=2), nullable=True),
    sa.Column('weekly_availability', sa.Integer(), nullable=True),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=50), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('project',
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('project_name', sa.String(length=100), nullable=False),
    sa.Column('account_manager_id', sa.Integer(), nullable=False),
    sa.Column('assistant_id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['account_manager_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['assistant_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['customer_id'], ['customer.id'], ),
    sa.PrimaryKeyConstraint('project_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('project')
    op.drop_table('user')
    op.drop_table('customer')
    # ### end Alembic commands ###
