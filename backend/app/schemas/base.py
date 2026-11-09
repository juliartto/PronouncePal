from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class ModeloBase(BaseModel):
    # No JSON os campos ficam em camelCase, igual aos tipos do frontend
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, str_strip_whitespace=True)
