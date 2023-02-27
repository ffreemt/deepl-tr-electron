r"""Gen docx or docx table per python-shell's request.

app\install\python.exe -m pylint pyscript.py
app\install\python.exe -m pip install -U rowdata2file
"""
# pylint: disable=broad-except, unused-import, line-too-long
import json
import sys
from rowdata2file.rowdata2docx import rowdata2docx  # noqa
from rowdata2file.rowdata2docx_t import rowdata2docx_t  # noqa
from loguru import logger

# app\install\python.exe pyscript.py "{\"rowdata\": [{\"text1\": \"test 1\", \"text2\": \"text 2\"}, {\"text1\": \"test 1a\", \"text2\": \"text 2a\"}], \"infilepath\": \"a.txt\"}"
# app\install\python.exe pyscript.py "{\"rowdata\": [{\"text1\": \"test 1\", \"text2\": \"text 2\"}, {\"text1\": \"test 1a\", \"text2\": \"text 2a\"}], \"infilepath\": \"a.txt\", \"rowdata2file\": \"rowdata2docx_t\"}"


def main():
    """Bootstrap."""
    # extrat rowdata and infilepath from sys.argv[1]
    if not sys.argv[1:]:
        return """no argument provided, cant continue. giveme something like '{"rowdata": {}, "infilepath": ...}' """

    # convert string to dict
    try:
        jdata = json.loads(sys.argv[1])
    except Exception as exc:
        return str(exc)

    if not (jdata.get("rowdata") and jdata.get("infilepath")):
        return """ one or both 'rowdata' and 'infilepath' is empty, cant continue.  giveme something like '{"rowdata": {}, "infilepath": ...}'"""

    infilepath = jdata.get("infilepath")
    rowdata = jdata.get("rowdata")

    # rowdata2file default to "rowdata2docx"
    rowdata2file = jdata.get("rowdata2file") or "rowdata2docx"

    logger.debug(f" rowdata2file: {rowdata2file}")
    logger.debug(f" type(globals()[rowdata2file]): {type(globals()[rowdata2file])}")

    _ = globals()[rowdata2file](rowdata, infilepath)
    print(_)

    return _


if __name__ == "__main__":
    _ = main()
    print(_)
